function consoleLOG(data:unknown):void{

  const DEF:Deno.InspectOptions = { 
      colors: true, 
      breakLength: 280, 
      depth: 20,
      maxArrayLength: Infinity
    };
  console.log(Deno.inspect(data, DEF));

}

export {consoleLOG};
