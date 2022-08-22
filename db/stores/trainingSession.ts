import Ajv from 'ajv';

const Datastore = require('nedb-promises');

const trainingSessionSchema = require('../schemas/trainingSession.json');

class TrainingSessionStore {
  schemaValidator;

  db;

  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });

    this.schemaValidator = ajv.compile(trainingSessionSchema);

    const path =
      process.env.NODE_ENV === 'development'
        ? `${process.cwd()}/trainingSessions.db`
        : `${process.resourcesPath}/data/trainingSessions.db`;

    this.db = Datastore.create({
      filename: path,
      timestampData: true,
      autoload: true,
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

      const techniques: Technique[] = [];

      units.forEach((unit) => {
        unit.techniques.forEach((technique) => {
          if (techniques.length < 3) {
            techniques.push(technique);
          }
        });
      });

      const summary = {
        target,
        duration: units.reduce((acc, unit) => acc + unit.duration, 0),
        techniques,
      };

      return this.db.insert({ name, units, summary });
    }

    throw new Error('invalid data');
  }

  read(_id: string) {
    return this.db.findOne({ _id }).exec();
  }

  readAll() {
    return this.db.find({});
  }

  delete(_id: string) {
    return this.db.remove({ _id });
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
