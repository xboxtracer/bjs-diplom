'use strict'

const logoutUser = new LogoutButton();
logoutUser.action = () => ApiConnector.logout(response => response ? location.reload() : console.log(1));

ApiConnector.current(response => response.success && ProfileWidget.showProfile(response.data));

const showUserRates = new RatesBoard();
function getNewRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            showUserRates.clearTable();
            showUserRates.fillTable(response.data);
        }
    });
};

getNewRates();
setInterval(getNewRates, 60000);

const userMoneyManager = new MoneyManager();
userMoneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data)
            userMoneyManager.setMessage(!response.success, 'Успешное поплнение баланса!')
        } else {
            userMoneyManager.setMessage(!response.success, response.data)
        }
    })
};
userMoneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data)
            userMoneyManager.setMessage(!response.success, 'Перевод произведен успешно!')
        } else {
            userMoneyManager.setMessage(!response.success, response.data)
        }
    })
};
userMoneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data)
            userMoneyManager.setMessage(!response.success, 'Операция прошла успешно!')
        } else {
            userMoneyManager.setMessage(!response.success, response.data)
        }
    })
};

const userFavoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
    if (response.success) {
        userFavoritesWidget.clearTable();
        userFavoritesWidget.fillTable(response.data);
        userMoneyManager.updateUsersList(response.data);
    }
});
userFavoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
        userFavoritesWidget.clearTable();
        userFavoritesWidget.fillTable(response.data);
        userMoneyManager.updateUsersList(response.data);
        userFavoritesWidget.setMessage(!response.success, 'Пользователь успешно добавлен!')
    } else {
        userFavoritesWidget.setMessage(!response.success, response.data)
    }
});
userFavoritesWidget.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
        userFavoritesWidget.clearTable();
        userFavoritesWidget.fillTable(response.data);
        userMoneyManager.updateUsersList(response.data);
        userFavoritesWidget.setMessage(!response.success, 'Пользователь успешно удалён!')
    } else {
        userFavoritesWidget.setMessage(!response.success, response.data)
    }
});