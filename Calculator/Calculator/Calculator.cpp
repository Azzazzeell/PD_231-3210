#include <iostream>
#include <string>
#include <unordered_map>
#include <functional>
#include <stdexcept>

class Calculator {
public:
    double calculate(const std::string& expression) {
        if (expression.empty()) {
            throw std::invalid_argument("INVALID_ARGUMENT");
        }

        double a, b;
        char op;
        int numScanned = std::sscanf(expression.c_str(), "%lf %c %lf", &a, &op, &b);
        if (numScanned != 3) {
            throw std::invalid_argument("INVALID_OPERAND");
        }

        if (methods.find(op) == methods.end()) {
            throw std::invalid_argument("UNKNOWN_OPERATION");
        }

        return methods[op](a, b);
    }

    void addMethod(char operation, std::function<double(double, double)> func) {
        if (!func) {
            throw std::invalid_argument("INVALID_ARGUMENT");
        }

        methods[operation] = func;
    }

private:
    std::unordered_map<char, std::function<double(double, double)>> methods;
};

int main() {
    try {
        Calculator calc;
        calc.addMethod('+', [](double a, double b) { return a + b; });
        calc.addMethod('*', [](double a, double b) { return a * b; });
        calc.addMethod('/', [](double a, double b) { return a / b; });
        calc.addMethod('^', [](double a, double b) { return std::pow(a, b); });

        std::cout << calc.calculate("2 ^ 3") << std::endl; // 8

        std::cout << calc.calculate("h - 10") << std::endl; // Error: INVALID_OPERAND
    }
    catch (const std::invalid_argument& e) {
        std::cerr << e.what() << std::endl;
    }

    try {
        Calculator calc;
        std::cout << calc.calculate("3 * 5") << std::endl; // Error: UNKNOWN_OPERATION
    }
    catch (const std::invalid_argument& e) {
        std::cerr << e.what() << std::endl;
    }

    try {
        Calculator calc;
        std::cout << calc.calculate("1 + 3") << std::endl; // Error: INVALID_ARGUMENT
    }
    catch (const std::invalid_argument& e) {
        std::cerr << e.what() << std::endl;
    }

    return 0;
}