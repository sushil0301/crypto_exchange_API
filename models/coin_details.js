module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      exchange_id: String,
      name: String,
      volume_1day_usd: String,
      icon: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  schema.plugin(mongoosePaginate);
  const coin_details = mongoose.model("coin_details", schema);
  return coin_details;
};
