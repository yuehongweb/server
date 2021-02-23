import mongoose from '../config/DBhelper';

const Schema = mongoose.Schema;

const TestSchema = new Schema({
  username: { type: String },
  nickname:{ type: String },
  password: { type: String }
});

const TestModel = mongoose.model('users', TestSchema);

export default TestModel;
