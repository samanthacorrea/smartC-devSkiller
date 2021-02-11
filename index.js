export default class OrdersAnalyzer {
    constructor() {
        this.weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    }

    averageDailySales = (productId, orders) => {

	// initialize arrays
        let result = [];
        let finalResult = [];
        for (weekday of this.weekdays) {
            result[weekday] = {};
            result[weekday].total = 0;
            result[weekday].qtd = 0;
        }
        
	// build result list by weekday
        for (order of orders) {
            let weekDay = new Date(order.creationDate).getDay();
            let weekDayKey = this.weekdays[weekDay]
            for (product of order.orderLines) {
                if (product.productId == productId) {
                    result[weekDayKey].total += product.quantity;
                    result[weekDayKey].qtd += 1;
                }
            }
        }

	// final result list
        for (index in result) {
            let mediaCalc = 0;
            let data = result[index];
            mediaCalc = (data.qtd == 0) ? 0 : data.total/data.qtd;
            result[index] = mediaCalc;
        }

        return {...result};
    }
}
