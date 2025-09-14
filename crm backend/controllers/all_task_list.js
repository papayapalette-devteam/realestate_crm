const mailtask_form=require('../models/mail_task_form')
const calltask_form=require('../models/call_task_form')



 const view_followup_task = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

//    console.log(req.query);
   
    
    
    // Fetch tasks
    const resp = await mailtask_form.find().lean();
    const resp1 = await calltask_form.find().lean();

    // Merge and sort (assuming you want latest first, using createdAt)
    let follow_up_task = [...resp, ...resp1].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        const subtask=req.query.subtask
        const maintask=req.query.maintask

        if (subtask === "today") {
        follow_up_task = follow_up_task.filter((item) => {
            const dateString = item.due_date
            if (!dateString) return false;
            const dateOnly = dateString.split("T")[0];
            return dateOnly === today && item.complete !== "true";
        });
    }
     else if (subtask === "upcoming") {
    follow_up_task = follow_up_task.filter((item) => {
        const dateString = item.due_date
        if (!dateString) return false;
        const dateOnly = dateString.split("T")[0];
        return dateOnly > today && item.complete !== "true";
    });
    }

    else if (subtask === "overdue") {
    follow_up_task = follow_up_task.filter((item) => {
        const dateString = item.due_date
        if (!dateString) return false;
        const dateOnly = dateString.split("T")[0];
        return dateOnly < today && item.complete !== "true";
    });
    }
    else if (subtask === "complete") {
        follow_up_task = follow_up_task.filter((item) => item.complete === "true");
        }

    // Apply pagination
    const paginatedTasks = follow_up_task.slice(skip, skip + limit);

    res.status(200).send({
      message: "Follow up tasks fetched successfully",
      total: follow_up_task.length, // total count
      page,
      limit,
      followup_task: paginatedTasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching follow-up tasks" });
  }
};


module.exports={view_followup_task}