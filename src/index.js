function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    let arr = fill_array(expr);

    return get_final_result(arr);

}

module.exports = {
    expressionCalculator
}

function fill_array(str) {

    let result = [];
    let number = '';

    let spaces_number = str.split(' ').length - 1;
    for (let i = 0; i < spaces_number; i++) str = str.replace(' ', '');
    
    for (let i of str) {

        if (Number(i)) {
            number += i;
            continue;
        }
        result.push(Number(number));
        number = '';
        result.push(i);
    }

    result.push(Number(number));

    return result;
}


function get_math_result(operand, number_1, number_2) {
    switch (operand) {
        case '*':
            return number_1 * number_2;
        case '/':
            return number_1 / number_2;
        case '+':
            return number_1 + number_2;
        case '-':
            return number_1 - number_2;
    }
}


function get_final_result(arr) {
    if (arr.length == 1) return arr[0];

    let index_open_bracket = 0;
    let index_close_bracket = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] == '(') index_open_bracket = i;
        
        if (arr[i] == ')') {
            index_close_bracket = i;
            let in_brackets = arr.slice(index_open_bracket + 1, index_close_bracket);
            let temp_arr = arr.slice();
            temp_arr.splice(index_open_bracket, (index_close_bracket - index_open_bracket), get_final_result(in_brackets))
            get_final_result(temp_arr);            
        }

        if ((arr[i] == '*') || (arr[i] == '/')) {
            let temp_arr = arr.slice();
            temp_arr.splice(i - 1, 3, get_math_result(arr[i], arr[i - 1], arr[i + 1]))
            get_final_result(temp_arr);  
        }

        if ((arr[i] == '+') || (arr[i] == '-')) {
            let temp_arr = arr.slice();
            temp_arr.splice(i - 1, 3, get_math_result(arr[i], arr[i - 1], arr[i + 1]))
            get_final_result(temp_arr);  
        }
    }
}