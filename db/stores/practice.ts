import Ajv from 'ajv';

const Datastore = require('nedb-promises');

const practiceSchema = require('../schemas/practice.json');

class PracticeStore {
  schemaValidator;

  db;

  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });

    this.schemaValidator = ajv.compile(practiceSchema);

    const path =
      process.env.NODE_ENV === 'development'
        ? `${process.cwd()}/practices.db`
        : `${process.resourcesPath}/data/practices.db`;

    this.db = Datastore.create({
      filename: path,
      timestampData: true,
      autoload: true,
    });
  }

  validate(data: PracticePayload) {
    return this.schemaValidator(data);
  }

  async create({ words = 0, ppm, comprehension, techniques }: PracticePayload) {
    const data = {
      words,
      ppm,
      comprehension,
      techniques,
    };

    const isValid = this.validate(data);

    const points = ppm + words * 0.5 * comprehension * 1;

    const practice = {
      comprehension,
      ppm,
      techniques,
      words,
      points,
    };

    if (isValid) {
      this.db.insert(practice);
    }
  }

  read(_id: string) {
    return this.db.findOne({ _id }).exec();
  }

  readAll() {
    return this.db.find({}).exec();
  }

  async rank({ page = 0, limit = 10 }: RankingPayload): Promise<RankData> {
    const rank = await this.db
      .find()
      .sort({ points: -1 })
      .limit(limit)
      .skip(page * limit);

    const count = await this.db.count({});

    return { rank, count };
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
