
const assetModel = require('../models/projects');

module.exports = {
  assetDetails: async (req, res) => {

    try {
      const { ProjectId,Title, Client,ProjectValue,ResourceBudjet,ProjectDurationFrom,ProjectDurationTo,Description} = req.body;

      const result = new assetModel({
        ProjectId:ProjectId,
        Title: Title,
        Client: Client,
        ProjectValue:ProjectValue,
        ResourceBudjet:ResourceBudjet,
        ProjectDurationFrom:ProjectDurationFrom,
        ProjectDurationTo:ProjectDurationTo,
        Description: Description,

      });

      await result.save();
      console.log(result.image);
      return res.status(201).json({ message: 'Successfully submitted', result });
    } catch (err) {
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
 projectDetailsupdate: async (req, res) => {
  const { id } = req.params;


  const updates = req.body;
  // console.log('hmm',req.body);


  try {
 

    const updatedWorkOrder = await assetModel.findByIdAndUpdate(id, updates, { new: true });
    // console.log('hello',updatedWorkOrder)

    if (updatedWorkOrder) {
      return res.status(200).json({ message: 'Workorder details updated successfully' });
    }

    return res.status(200).json(updatedWorkOrder);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }


},

projectDetailsdelete: async (req, res) => {

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


