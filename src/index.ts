import { connectDB, sequelize } from './dbConnection';
import express from 'express';
const app = express();
import userRoutes from './routes/user.routes';

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
const main= async()=> {
    try {
        await connectDB();
        console.log('Connection has been established successfully.');
       

      await sequelize.sync({alter: true});
  
       app.use('/users', userRoutes);
     
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
main();