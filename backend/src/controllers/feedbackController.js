import fs from 'fs';
import path from 'path';

const sendFeedback = async (req, res, next) => {
  try {
    const { name, phone, message } = req.body;

    const store = { name, phone, message, date: new Date() };

    const dbFile = path.join(process.cwd(), 'data', 'feedback.json');
    fs.mkdirSync(path.dirname(dbFile), { recursive: true });

    let arr = [];
    if (fs.existsSync(dbFile)) arr = JSON.parse(fs.readFileSync(dbFile));
    arr.push(store);
    fs.writeFileSync(dbFile, JSON.stringify(arr, null, 2));

    res.status(201).json({ message: 'Thank you for your feedback' });
  } catch (err) {
    next(err);
  }
};

export default sendFeedback ;
