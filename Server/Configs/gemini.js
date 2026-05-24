const Gemini_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent"


import User from "../Models/user.model.js";

export const generateGeminiResponse = async ({
    prompt,
    apikey,
    userId
}) => {
    try {

        if (!apikey) {
            throw new Error("Gemini API key missing")
        }

        const response = await fetch(`${Gemini_URL}?key=${apikey}`, {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })

        })

        if (!response.ok) {

        // Invalid API Key
        if (
          response.status === 400 ||
          response.status === 401
        ) {
          if (userId) {
            await User.findByIdAndUpdate(userId, { geminiStatus: "invalid" });
          }
        }

        // Quota Exceeded
        if (
          response.status === 429
        ) {
          if (userId) {
            await User.findByIdAndUpdate(userId, { geminiStatus: "quota_exceeded" });
          }
        }

        const err =
          await response.text();

        throw new Error(err);
      }

      // =========================
      // SUCCESS STATUS
      // =========================

      if (userId) {
        await User.findByIdAndUpdate(userId, { geminiStatus: "active" });
      }

      const data = await response.json()
      

      const text = data.candidates?.[0]
        ?.content?.parts?.[0]
        ?.text;

         if (!text) {

        throw new Error(
          "No text returned from Gemini"
        );
      }

      return text.trim();
    } catch (error) {

         console.error(
        "Gemini Fetch Error:",
        error.message
      );

      throw new Error(error.message || "Gemini API fetch failed");

    }
}