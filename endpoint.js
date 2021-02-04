const apiResponse = require('./api_response');
const Db = require('./module/mysql');

function addproduct(data){
    try {

        let statement = `Select * from Product where product=?`;
        let values = [data.product];

        const connection =  Db.getConnectionPool().getConnection();
         Db.changeDb('Warehouse', connection);
        let row =  connection.query(statement, values);
        let column= row[0];
        connection.release();

        if (column.length == 0) {
            statement = `Insert into Product SET product=?`;
            values = [data.product];

             Db.getConnectionPool().getConnection();
             Db.changeDb('Regov', connection);
            const r =  connection.query(statement, values);
            connection.release();
            return Promise.resolve(new apiResponse(200, r));

        }
        else {
            return Promise.resolve(new apiResponse(200, "Product Exist"))
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(new apiResponse(500, err.code));
    }
}

function getproduct(){
    try {
        const statement = 'SELECT * FROM Product';
        const connection =  Db.getConnectionPool().getConnection();
         Db.changeDb('Warehouse', connection);
        const rows =  connection.query(statement);
        const data = rows[0];
        connection.release();
        return Promise.resolve(new apiResponse(200, data));

    } catch (error) {
        console.log(error);
        return Promise.reject(new apiResponse(500, err.code));
    }
}

function addwarehouse(data){
    try {

        let statement = `Select * from Warehouse where warehouse=?`;
        let values = [data.warehouse];

        const connection =  Db.getConnectionPool().getConnection();
         Db.changeDb('Regov', connection);
        let row=  connection.query(statement, values);
        let column = row[0];
        connection.release();

        if (column.length == 0) {
            statement = `Insert into warehouse SET warehouse=?`;
            values = [data.warehouse];

             Db.getConnectionPool().getConnection();
             Db.changeDb('Regov', connection);
            const r =  connection.query(statement, values);
            connection.release();
            return Promise.resolve(new apiResponse(200, r));

        }
        else {
            return Promise.resolve(new apiResponse(200, "Product Exist"))
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(new apiResponse(500, err.code));
    }
}

function getwarehouse(Id){
    try {
        const statement = 'SELECT c.Product,a.Stock,b.warehouse FROM Stock a,warehouse b,product c where a.wId = b.Id and a.pId = c.Id and b.Id=? ';
        const values = [Id];
        const connection =  Db.getConnectionPool().getConnection();
         Db.changeDb('Regov', connection);
        const rows =  connection.query(statement, Id);
        const data = rows[0];
        connection.release();
        return Promise.resolve(new apiResponse(200, r));

    } catch (error) {
        console.log(error);
        return Promise.reject(new apiResponse(500, err.code));
    }
}


function getwarehouses(){
    try {
        const statement = 'SELECT * FROM warehouse';
        const connection =  Db.getConnectionPool().getConnection();
         Db.changeDb('Regov', connection);
        const rows=  connection.query(statement);
        const data = rows[0];
        connection.release();
        return Promise.resolve(new apiResponse(200, r));

    } catch (error) {
        console.log(error);
        return Promise.reject(new apiResponse(500, err.code));
    }
}

function stock(data){
    try {
        let statement = `Select * from Stock where wid=? and pid=?`;
        let values = [data.wid, data.pid];

        const connection =  Db.getConnectionPool().getConnection();
         Db.changeDb('Regov', connection);
        let row=  connection.query(statement, values);
        let column = row[0];
        connection.release();

        let existingstock = column.length > 0 ? column[0].stock : 0;
        data.stock = data.stock + existingstock;

        statement = column.length > 0 ? `UPDATE Stock SET stock=? WHERE Id= "${column[0].Id}"` : 'Insert into Stock set stock=?,wid=?,pid=?';
        values = column.length > 0 ? [data.stock] : [data.stock, data.wid, data.pid];

         Db.getConnectionPool().getConnection();
         Db.changeDb('Regov', connection);
        const r =  connection.query(statement, values);
        connection.release();

        return Promise.resolve(new apiResponse(200, r));

    } catch (error) {
        console.log(error);
        return Promise.reject(new apiResponse(500, err.code));
    }
}

function unstock(data){
    try {
        let statement = `Select * from Stock where wid=? and pid=?`;
        let values = [data.wid, data.pid];

        const connection =  Db.getConnectionPool().getConnection();
         Db.changeDb('Regov', connection);
        let row=  connection.query(statement, values);
        let column = row[0];
        connection.release();
        if (column.length > 0) {
            let existingstock = column.length > 0 ? column[0].stock : 0;
            data.stock = existingstock - data.stock;

            statement = data.stock > 0 ? `UPDATE Stock SET stock="${data.stock}" WHERE Id="${column[0].Id}"` : `Delete from Stock where Id="${column[0].Id}"`;
             Db.getConnectionPool().getConnection();
             Db.changeDb('Regov', connection);
            const r =  connection.query(statement);
            connection.release();
            return Promise.resolve(new apiResponse(200, r));
        }
        else {
            return Promise.resolve(new apiResponse(200,"Please check on stock details before unstock it"));
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(new apiResponse(500, err.code));
    }
}

function getstock(){
    try {
        const statement = "Select * from Stock";

        const connection =  Db.getConnectionPool().getConnection();
         Db.changeDb('Regov', connection);
        const r =  connection.query(statement);
        connection.release();
        return Promise.resolve(new apiResponse(200, r));

    } catch (error) {
        console.log(error);
        return Promise.reject(new apiResponse(500, err.code));
    }
}

function deleteproduct(id){
    try {
        const statement = "Select * from Stock";

        const connection =  Db.getConnectionPool().getConnection();
         Db.changeDb('Regov', connection);
        const r =  connection.query(statement,id);
        connection.release();
        return Promise.resolve(new apiResponse(200, r));

    } catch (error) {
        console.log(error);
        return Promise.reject(new apiResponse(500, err.code));
    }
}

function deletewarehouse(id){
    try {
        const statement = "Delete * from Warehouse where Id=?";

        const connection =  Db.getConnectionPool().getConnection();
         Db.changeDb('Regov', connection);
        const r =  connection.query(statement,id);
        connection.release();
        return Promise.resolve(new apiResponse(200, r));

    } catch (error) {
        console.log(error);
        return Promise.reject(new apiResponse(500, err.code));
    }
}



module.exports = {  
    getproduct : getproduct,
    addproduct : addproduct,
    deleteproduct : deleteproduct,
    getwarehouse : getwarehouse,
    getwarehouses : getwarehouses,
    deletewarehouse:deletewarehouse,
    addwarehouse:addwarehouse,
    getstock:getstock,
    stock:stock,
    unstock:unstock
}