#include <iostream>
#include <stdexcept>
#include <vector>

int sum(const std::vector<int>& args) {
    if (args.size() < 2) {
        throw std::invalid_argument("INVALID_ARGUMENTS_COUNT");
    }

    int result = 0;
    for (int arg : args) {
        result += arg;
    }

    return result;
}

int main() {
    try {
        std::vector<int> args1 = { 1, 2, 3 };
        std::cout << sum(args1) << std::endl; // 6

        std::vector<int> args2 = {};
        std::cout << sum(args2) << std::endl; // Error: INVALID_ARGUMENTS_COUNT
    }
    catch (const std::invalid_argument& e) {
        std::cerr << e.what() << std::endl;
    }

    try {
        std::vector<int> args3 = { 0, 1, '1', 2 }; // '1' is not a number
        std::cout << sum(args3) << std::endl; // Error: INVALID_ARGUMENT
    }
    catch (const std::invalid_argument& e) {
        std::cerr << e.what() << std::endl;
    }

    return 0;
}