const mysqlDAO = require('../../db/mysqlDao');
const logger = require('../../utils/logger');
const methods = require('../../utils/methods');
const masterModel = require('../../models/master-model');
const constants = require('../../utils/constants');
const dotenv = require('dotenv');
dotenv.config();

async function getDetails(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();


    try {

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);


        query = "SELECT *FROM `login`;";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
            logger.log('QueryModel: ' + JSON.stringify(queryModel));
            resModel.data = queryModel;
        } else {
            resModel.status = constants.ERROR;
            resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
        }
        logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

    } catch (error) {
        resModel.status = -33;
        resModel.info = 'catch : ' + resModel.info + ' : ' + error;
        logger.error(JSON.stringify(resModel));
    } finally {
        try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) {}
    }
    //returning the model
    return resModel;
}

async function loginSubmit(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let username;
    let password;

    try {
        username = body.username;
        password = body.password;

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        query = "INSERT INTO `login` (`username`, `password`) VALUES('" +
            username + "','" + password + "');";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
            logger.log('QueryModel: ' + JSON.stringify(queryModel));
            resModel.data = queryModel;
        } else {
            resModel.status = constants.ERROR;
            resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
        }
        logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

    } catch (error) {
        resModel.status = -33;
        resModel.info = 'catch : ' + resModel.info + ' : ' + error;
        logger.error(JSON.stringify(resModel));
    } finally {
        try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) {}
    }
    //returning the model
    return resModel;
}

//exporting module for node express JS server router
module.exports = { getDetails, loginSubmit };