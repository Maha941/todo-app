let task=[
  {
    id:1,
    title:"task1",
    completed:false
  }
]
export async function GET(request){
  return Response.json(task);
}
export async function POST(request){
  const body=await request.json();

const newdata={
  id:task.length+1,
  title: body.title || body.tittle,
  completed:false
}
task.push(newdata);
return Response.json ({ message: "Task add ho gaya!", task: newdata },
    { status: 201 } 
  );
}

export async function DELETE(request){
  const body=await request.json();
  task=task.filter((item)=>item.id!==body.id);
  return Response.json({message:"Task delete ho gaya!"});
}

export async function PATCH(request){
const{id}=await request.json();
const item=task.find((item)=>item.id==id);
 if (!item){
  return Response.json({message:"task nhi mila mujhe agy hn smajh  "},{status:404});

 }
item.completed=!item.completed
return Response.json(item);

}










