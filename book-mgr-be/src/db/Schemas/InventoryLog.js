const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const InventoryLogSchema = new mongoose.Schema({
    type: String,
    num: Number,
    user: String,

    meta: getMeta(), //谁在什么时间是出库的还是入库的多少样的货品
});

InventoryLogSchema.pre('save', preSave);
//定义完要进行注册
mongoose.model('InventoryLog', InventoryLogSchema);