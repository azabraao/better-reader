const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const practiceSchema = require('../schemas/practice.json');

class PracticeStore {
  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });

    this.schemaValidator = ajv.compile(practiceSchema);
    const dbPath = `${process.cwd()}/practices.db`;

    this.db = Datastore.create({
      filename: dbPath,
      timestampData: true,
    });
  }

  validate(data) {
    return this.schemaValidator(data);
  }

  create(data) {
    const isValid = this.validate(data);
    if (isValid) {
      return this.db.insert(data);
    }
    return null;
  }

  read(_id) {
    return this.db.findOne({ _id }).exec();
  }

  readAll() {
    return this.db.find();
  }

  // Todo: implement readActive and archive
  // readActive() {
  //   return this.db.find({ isDone: false }).exec();
  // }

  // archive({ _id }) {
  //   return this.db.update({ _id }, { $set: { isDone: true } });
  // }
}

module.exports = new PracticeStore();
