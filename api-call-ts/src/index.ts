

import express, { Request, Response } from 'express';
const app = express();
const PORT = 3000;

app.get('/non_blocking', (req: Request, res: Response) => {
  res.json({ message: 'Hello, World!' });
});



const sum = (a: number, b: number): number => a + b;

const multiply = (a: number, b: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = a * b;
            resolve(result);
        }, 5000);
    });
};


app.get('/blocking', async (req: Request, res: Response) => {
    try{
        const multiplicationResult = await multiply(25, 30);
        console.log(multiplicationResult);

        const sumResult = sum(20, 30);
        console.log(sumResult);
        res.json({
            multiply: multiplicationResult,
            sum: sumResult
        });
    }
    catch(error){
        res.status(500).json({ error: "Something went wrong" });
    }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
