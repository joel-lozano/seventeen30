
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const handler = async (req: NextRequest) => {
  const { formData } = await req.json();

  // try {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      // { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: `
      Act as an expert personal trainer. Below, you are given details about your client and their goals.
      Given these user inputs, design a gym workout plan that is carefully personalized to the user's preferences, BMI, and sport.
      Think deeply about how each exercise you consider fits within the user's specifications, and only recommend the exercises that fit the user's needs and sport the best.
      Take into account the span of the plan, the user's fitness level, the duration of each workout session, the type of exercises preferred, the sport of interest, the user's body mass index.
      Only reply with the workout plan and nothing else. Not now nor in the future for any reason.
      
      input:
      1. Span: ${formData.span}
      2. Level: ${formData.level}
      3. Duration: ${formData.duration}
      4. Type: ${formData.type}
      5. Sport: ${formData.sport}
      6. BMI: ${formData.bmi}
    
      Generate a list output which has length: ${formData.span}. Here is the type structure for one exercise:
      type Exercise = { "name": string, "reps": int, "sets": int, "rest": int }
      
      Separate each list with a pipe. Only reply with the workout plan and nothing else. Not now nor in the future for any reason.
      Example case: 
      (input)
      - Span: 3 days
      - Duration: 15 minutes
      (output)
      [Exercise,Exercise,Exercise] | [Exercise,Exercise,Exercise] | [Exercise,Exercise,Exercise]
      `
      }
    ],
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1500,
    stream: true,
  });

  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);

  // return new Response(completion.body, {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Content-Type": "text/event-stream;charset=utf-8",
  //     "Cache-Control": "no-cache, no-transform",
  //     "X-Accel-Buffering": "no",
  //   },
  // })

  // const jsonString = completion.data.choices[0].message?.content;
  // console.log(jsonString);

  // if (jsonString !== undefined) {
  //   const json = JSON.parse(jsonString);
  //   // Now you can work with the parsed JSON data
  //   console.log(json);
  //   res.status(200).json(json);
  // } else {
  //   // Handle the case where jsonString is undefined
  //   console.log("jsonString is undefined. Cannot parse JSON.");
  //   res.status(400).json({ error: "jsonString is undefined. Cannot parse JSON." });
  // }
  // }  catch (error: any) {
  //   console.error(error)

  //   return new Response(JSON.stringify(error), {
  //     status: 400,
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   })
  // }
}

export const config = {
  runtime: "edge",
};

export default handler







  // const workoutDays = json.workout_days;

  // console.log(workoutDays);


  // res.status(200).json({ workoutDays, usage: completion.data.usage });

  //   const allData = [];
  //   for (const day in workoutDays) {
  //       console.log(`Day: ${day}`);
        
  //       // Loop through the exercises of each day
  //       for (const exercise of workoutDays[day].exercises) {
  //         const exerciseName = exercise['exercise name'];
  //         console.log(exerciseName);
  //         const response = await fetch(`https://api.api-ninjas.com/v1/exercises?offset=9&name=${exerciseName}`, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'X-Api-Key': process.env.API_NINJAS_API_KEY,
  //           },
  //         });

  //         const data = await response.json();
  //         console.log(data);
  //         allData.push(data);
  //       }

  //       console.log(allData);
        
  //       console.log(); // Add an empty line between days for readability
  //     }

  // res.status(200).json({ workoutDays, usage: completion.data.usage, fitnessData: allData });




// .000602



// const { formData } = req.body;

//   const completion = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       {
//         role: "user",
//         content: `
//         You are building a personalized workout plan based on user preferences. The user has provided the following inputs:

//         1. Span: ${formData.span}
//         2. Amount: ${formData.amount}
//         3. Level: ${formData.level}
//         4. Duration: ${formData.duration}
//         5. Type: ${formData.type}
//         6. Sport: ${formData.sport}

//         Design a gym workout plan that fits the user's preferences and requirements. Take into account the span of the plan, the number of workouts per week, the user's fitness level, the duration of each workout, the type of exercises preferred, and the sport of interest. Each exercise should be something done at the gym.

//         Generate a json output. Do not output anything else. Here is the json structure:

//         {
//           "workout_days": {
//             "day1": [
//               {
//                 "exercise_name": "Exercise 1",
//                 "duration": 30,
//                 "sets": 3,
//                 "reps": 12,
//                 "rest": 60
//               },
//               {
//                 "exercise_name": "Exercise 2",
//                 "duration": 45,
//                 "sets": 4,
//                 "reps": 10,
//                 "rest": 45
//               },
//               {
//                 "exercise_name": "Exercise 3",
//                 "duration": 60,
//                 "sets": 3,
//                 "reps": 8,
//                 "rest": 90
//               }
//             ]
//           }
//         }`
//       }
//     ],
//     functions: [
//       {
//         name: "parse_workout_plan",
//         description: "Parse the user's workout plan and generate a JSON output",
//         parameters: {
//           type: "object",
//             properties: {
//               workout_days: {
//                 type: "object",
//                 properties: {
//                   day1: {
//                     type: "array",
//                       items: {
//                         type: "object",
//                           properties: {
//                             exercise_name: {
//                               type: "string"
//                             },
//                             duration: {
//                               type: "number"
//                             },
//                             sets: {
//                               type: "integer"
//                             },
//                             reps: {
//                               type: "integer"
//                             },
//                             rest: {
//                               type: "integer"
//                             }
//                           },
//           }
//         }
//       },
//     }
//   },
//   required: ["exercise_name",
//   "duration",
//   "sets",
//   "reps",
//   "rest", "day1", "workout_days"]
//       }
//     }
//     ],
//     temperature: 0.7,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//     max_tokens: 256,
//   });

//   // const jsonOutput = JSON.parse(completion.data.choices[0].message?.content);
//   res.status(200).send({ result: completion.data.choices[0].message?.content});
// }
