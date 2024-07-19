import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

//Read
export const GET = async (request, { params }) => {
    try {
       await connectToDB(); 
       const prompt = await Prompt.findById(params.id).populate('creator');
        
       if(!prompt){
        return new Response("Prompt not found", { status: 404 });

       }
       return new Response(JSON.stringify(prompt),{ status: 200 });
    } catch (error) {
       console.log(error);
       console.log("this is the id", params.id)
       const errMessage = {
        message: "failed to fetch the post",
        prompt: params.id,
        tag: typeof params.id, 
       }
       return new Response(JSON.stringify(errMessage), { status: 500 });
    }
}
//Update
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
       await connectToDB();
       
       const existingPrompt = await Prompt.findById(params.id);

       if(!existingPrompt){
        return new Response("Prompt not found", { status: 404 });
       }
       
       existingPrompt.prompt = prompt;
       existingPrompt.tag = tag;

       await existingPrompt.save(); 

       return new Response(JSON.stringify(existingPrompt), { status: 200 });

    } catch (error) {
        console.log(error)       
        return new Response("Failed Update Prompt", { status: 500 });
    }
}

//Delete
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200});
    } catch (error) {
       console.log(error) 
       return new Response("Failed to delete prompt", { status: 500 });
    }
}