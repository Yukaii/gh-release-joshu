const eventHandlers: Record<string, (body: any) => Promise<void>> = {
  "installation.created": async (body) => {
    console.log("installation.created", body);
  },
};

export default eventHandlers;
