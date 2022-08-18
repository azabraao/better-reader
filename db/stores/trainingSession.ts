const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const trainingSessionSchema = require('../schemas/trainingSession.json');

class TrainingSessionStore {
  schemaValidator: any;

  db: any;

  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });

    this.schemaValidator = ajv.compile(trainingSessionSchema);
    const dbPath = `${process.cwd()}/trainingSessions.db`;
    this.db = Datastore.create({
      filename: dbPath,
      timestampData: true,
    });
  }

  validate(data: TrainingSessionPayload) {
    return this.schemaValidator(data);
  }

  create(data: TrainingSessionPayload) {
    const isValid = this.validate(data);
    if (isValid) {
      const { name, units } = data;

      let target = 0;
      data.units.forEach((unit) => {
        if (unit.target > target) {
          target = unit.target;
        }
      });

      const summary = {
        target,
        duration: units.reduce((acc, unit) => acc + unit.duration, 0),
        techniques: units
          .reduce((acc, unit) => [...acc, ...unit.techniques], [])
          .slice(0, 3),
      };

      return this.db.insert({ name, units, summary });
    }

    throw new Error('invalid data');
  }

  read(_id: string) {
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

module.exports = new TrainingSessionStore();
