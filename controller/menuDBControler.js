require("dotenv").config();

const pool = require('../model/database');
const MenuDBModel = require('../model/menuDBModel');


module.exports.getMenu = async (req, res) => {
    if (req.session) {
        const client = await pool.connect();
        const bar_id_text = req.params.id;
        const bar_id = parseInt(bar_id_text);

        try {
            if (isNaN(bar_id))
                res.sendStatus(400);

            else {
                const {rows: menus} = await MenuDBModel.getMenuByBarId(client, bar_id);

                if (menus.length !== 0) res.json(menus);
                else res.sendStatus(404);
            }
        } catch (error) {
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
}

module.exports.createMenu = async (req, res) => {
    if (req.session) {
        const body = req.body;
        const {menuname,isondisplay,happyhourstarttime,happyhourendtime,bar_id} = body;

        const client = await pool.connect();
        try {
            await MenuDBModel.postMenu(client,menuname,isondisplay,happyhourstarttime,happyhourendtime,bar_id);
            res.sendStatus(201);
        } catch (error) {
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
}

module.exports.updateMenu = async (req, res) => {
    if (req.session) {
        const toUpdate = req.body;
        const newData = {};

        const client = await pool.connect();

        const {rows: menusFound} = await MenuDBModel.getMenuByMenuIdAndBarId(client,toUpdate.menu_id,toUpdate.bar_id);
        const menuFound= menusFound[0];

        newData.menuname = toUpdate.menuname ? toUpdate.menuname : menuFound.menuname;
        newData.isondisplay = toUpdate.isondisplay !== menuFound.isondisplay ? toUpdate.isondisplay : menuFound.isondisplay;
        newData.happyhourstarttime = (toUpdate.happyhourstarttime === undefined || toUpdate.happyhourstarttime) ? toUpdate.happyhourstarttime : menuFound.happyhourstarttime;
        newData.happyhourendtime = (toUpdate.happyhourendtime === undefined || toUpdate.happyhourendtime) ? toUpdate.happyhourendtime : menuFound.happyhourendtime;

        try {
            await MenuDBModel.pathMenu(
                client,
                toUpdate.menu_id,
                toUpdate.bar_id,
                newData.menuname,
                newData.isondisplay,
                newData.happyhourstarttime,
                newData.happyhourendtime
            );
            res.sendStatus(204);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
}

module.exports.deleteMenu = async (req, res) => {
    if (req.session) {
        const menu_id_text = req.params.id;
        const menu_id = parseInt(menu_id_text);

        if (isNaN(menu_id))
            res.sendStatus(400);

        else {

            const client = await pool.connect();
            try {
                await MenuDBModel.deleteMenu(client, menu_id);
                res.sendStatus(204);
            } catch (error) {
                res.sendStatus(500);
            } finally {
                client.release();
            }
        }
    } else {
        res.sendStatus(401);
    }
}