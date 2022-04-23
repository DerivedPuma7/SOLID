import app from "./app";

const applicationPort = 3333;
app.listen(applicationPort, () => {
    console.log(`rodando na ${applicationPort}`);
});