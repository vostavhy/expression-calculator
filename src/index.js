function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    let arr = fill_array(expr);

    if (!check_brackets(arr)) throw new SyntaxError('ExpressionError: Brackets must be paired');

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

        if (Number(i) || (i == 0)) {
            number += i;
            continue;
        }

        if (number != '') {
            result.push(Number(number));
            number = '';
        }
        result.push(i);
    }

    if (number != '') result.push(Number(number));

    return result;
}


function get_math_result(operand, number_1, number_2) {
    switch (operand) {
        case '*':
            return number_1 * number_2;
        case '/':
            if (number_2 === 0) throw new TypeError('TypeError: Division by zero.');
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

    if ((arr.includes(')'))) {

        index_close_bracket = arr.indexOf(')');
        index_open_bracket = get_open_bracket_index(arr, index_close_bracket);
        let in_brackets = arr.slice(index_open_bracket + 1, index_close_bracket);
        let temp_arr = arr.slice();
        temp_arr.splice(index_open_bracket, (index_close_bracket - index_open_bracket + 1), get_final_result(in_brackets))
        return get_final_result(temp_arr);            
    }

    for (let i = 0; i < arr.length - 1; i++) {      
        
        if ((arr[i] == '*') || (arr[i] == '/')) {
            let temp_arr = arr.slice();
            temp_arr.splice(i - 1, 3, get_math_result(arr[i], arr[i - 1], arr[i + 1]))
            return get_final_result(temp_arr);  
        }

        if ((arr.includes('*')) || (arr.includes('/'))) {
            continue;
        }

        if ((arr[i] == '+') || (arr[i] == '-')) {
            let temp_arr = arr.slice();
            temp_arr.splice(i - 1, 3, get_math_result(arr[i], arr[i - 1], arr[i + 1]))
            return get_final_result(temp_arr);  
        }
    }
}

function get_open_bracket_index(arr, close_bracket_index) {
    let i = close_bracket_index;
    while(true) {
        if (arr[i] == '(') return i;
        i--;
    }
}


function check_brackets(arr) {
    let temp_arr = [];
    for (let i of arr) {
        if (i == '(') temp_arr.push('(');
        if (i == ')') {
            if (temp_arr.length == 0) return false;
            if (temp_arr.pop() != '(') return false;
        }
    }
    if (temp_arr.length != 0) return false;
    return true;
}
