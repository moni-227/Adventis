
const assetModel = require('../models/userprojects');

module.exports = {
  assetDetails: async (req, res) => {


    try {


      // const { Name, Projecttime1, Projecttime2, Projecttime3,TrainingLearningtime,Project1,Project2,Project3,TrainingLearing,Date,TotalTime} = req.body;
      const { Name, Projecttimefrom1, Projecttimeto1, Projecttimefrom2,Projecttimeto2,
        Projecttimefrom3,Projecttimeto3,Projecttimefrom4,Projecttimeto4,Projecttimefrom5,Projecttimeto5,
        TrainingLearing,TrainingLearningtimefrom,TrainingLearningtimeto,Project1,Project2,Project3,
        Project4,Project5,activity1,activity2,activity3,activity4,activity5,activity6,
        TodayDate,totaltimeproject1,totaltimeproject2,totaltimeproject3,totaltimeproject4,
        totaltimeproject5,totalTrainingLearning,totaytotaltime} = req.body;

      const result = new assetModel({
        // Name: Name,
        // Projecttime1: Projecttime1,
        // Projecttime2: Projecttime2,
        // Projecttime3: Projecttime3,
        // TrainingLearningtime: TrainingLearningtime,
        // Project1: Project1,
        // Project2: Project2,
        // Project3: Project3,
        // TrainingLearing: TrainingLearing,
        // Date: Date,
        // TotalTime: TotalTime,

        Name:Name, Projecttimefrom1:Projecttimefrom1, Projecttimeto1:Projecttimeto1, Projecttimefrom2:Projecttimefrom2,Projecttimeto2:Projecttimeto2,
        Projecttimefrom3:Projecttimefrom3,Projecttimeto3:Projecttimeto3,Projecttimefrom4:Projecttimefrom4,Projecttimeto4:Projecttimeto4,Projecttimefrom5:Projecttimefrom5,Projecttimeto5:Projecttimeto5,
        TrainingLearing:TrainingLearing,TrainingLearningtimefrom:TrainingLearningtimefrom,TrainingLearningtimeto:TrainingLearningtimeto,Project1:Project1,Project2:Project2,Project3:Project3,
        Project4:Project4,Project5:Project5,activity1:activity1,activity2:activity2,activity3:activity3,activity4:activity4,activity5:activity5,activity6:activity6,
        TodayDate:TodayDate,totaltimeproject1:totaltimeproject1,totaltimeproject2:totaltimeproject2,totaltimeproject3:totaltimeproject3,totaltimeproject4:totaltimeproject4,
        totaltimeproject5:totaltimeproject5,totalTrainingLearning:totalTrainingLearning,totaytotaltime:totaytotaltime
  

      });
// console.log(result)
      await result.save();
      return res.status(201).json({ message: 'Successfully submitted', result });
    } catch (err) {
      console.error('Error saving data:', err);
      res.status(400).json({
        err: err.message, // Return the error message
        

      });
    }
  },


  assetDetailsget: async (req, res) => {
    try{
 
     const result = await assetModel.find();
     
 
 
     res.status(200).json(result);
     return res
 
    }catch(err){
     res.status(400).json({
         err:err
      })
    }
 
 },
 userprojectupdate: async (req, res) => {
  const { id } = req.params;


  const updates = req.body;
  // console.log('hmm',req.body);


  try {
 

    const updatedWorkOrder = await assetModel.findByIdAndUpdate(id, updates, { new: true });
    // console.log('hello',updatedWorkOrder)

    if (updatedWorkOrder) {
      await updatedWorkOrder.save();
      return res.status(200).json({ message: 'Workorder details updated successfully' });
    }

    return res.status(200).json(updatedWorkOrder);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }


},
userprojectdelete: async (req, res) => {

  try{

    await assetModel.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Workorder details deleted successfully"});
  }catch(err){
    res.status(400).json({
        err:err
    })
  }
}

};


