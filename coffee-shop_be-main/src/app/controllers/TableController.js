import Table from "../model/TableModel.js"; 

export const createTable = async (req, res) => {
  const { name, email, phone, date, time, people, message } = req.body;
  try {
    const emailExistence = await TableModel.findOne({ email });
    if (emailExistence) {
      return res
        .status(400)
        .json({ success: false, message: "Email has been used" });
    }
    const table = new TableModel({
      name: name,
      email: email,
      date: date,
      phone: phone,
      time: time,
      people: people,
      message: message,
    });
    await table.save();
    res
      .status(200)
      .json({ success: true, message: "Book table successful", data: table });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Book failed", error: error });
  }
};
