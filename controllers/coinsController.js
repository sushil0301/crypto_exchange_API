const db = require("../models");
const Coin_Details = db.coin_details;
const request = require('request-promise');
// const mongoosePaginate = require("mongoose-paginate-v2");
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
module.exports = {
  async create(req, res) {
    try {
      var Coin_Details_payload = [];
      await request.get({
        uri: 'https://rest.coinapi.io/v1/exchanges',
        headers: {
          'X-CoinAPI-Key': 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9',
        }
      }).then((Data) => {
        let crypto_data = JSON.parse(Data);
        request.get({
          uri: 'https://rest.coinapi.io/v1/exchanges/icons/32',
          headers: {
            'X-CoinAPI-Key': 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9',
          }
        }).then((Icons_Data) => {
          let icons = JSON.parse(Icons_Data);
          for (let i = 0; i < crypto_data.length; i++) {
            const element = crypto_data[i];
            Coin_Details_payload.push({
              exchange_id: element.exchange_id,
              name: element.name,
              volume_1day_usd: element.volume_1day_usd,
              icon: icons.filter(x => x.exchange_id == element.exchange_id).map(y => y.url)[0]
            })
          }

          let addDetails = db.coin_details.create(Coin_Details_payload);
          if (addDetails)
            res.status(200).send({ res: '1', message: 'Success.', data: data });

        });

      });

    } catch (error) {
      res.status(500).send({ res: '0', message: error.message, data: null });

    }

  },

  async getAllRecord(req, res) {

    try {
      let getAllRecord = await db.coin_details.mongoosePaginate({}, {
        offset: 0, limit: 10
      });
      if (getAllRecord && getAllRecord.length) {
        res.status(200).send({ res: '1', message: 'success.', data: getAllRecord });

      }
    } catch (error) {
      res.status(500).send({ res: '0', message: error.message, data: null });

    }

  }

};
