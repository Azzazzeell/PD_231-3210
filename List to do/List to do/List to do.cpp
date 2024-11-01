#include <iostream>
#include <string>
#include <vector>
#include <stdexcept>
#include <unordered_map>

enum class TaskStatus {
    Todo,
    InProgress,
    Done
};

struct Task {
    int id;
    std::string description;
    TaskStatus status;
};

std::vector<Task> tasks;

void addTask(const std::string& description, TaskStatus status = TaskStatus::Todo) {
    if (description.empty() || !description.empty() && !std::isalpha(description[0])) {
        throw std::invalid_argument("INVALID_ARGUMENT");
    }
    if (status != TaskStatus::Todo && status != TaskStatus::InProgress && status != TaskStatus::Done) {
        throw std::invalid_argument("INVALID_STATUS");
    }

    int id = tasks.size() + 1;
    tasks.push_back({ id, description, status });
}

bool deleteTask(int id) {
    if (id <= 0) {
        throw std::invalid_argument("INVALID_ARGUMENT");
    }

    auto it = std::find_if(tasks.begin(), tasks.end(), [id](const Task& task) { return task.id == id; });
    if (it != tasks.end()) {
        tasks.erase(it);
        return true;
    }
    return false;
}

bool changeStatus(int id, TaskStatus status) {
    if (id <= 0 || (status != TaskStatus::Todo && status != TaskStatus::InProgress && status != TaskStatus::Done)) {
        throw std::invalid_argument("INVALID_ARGUMENT");
    }

    auto it = std::find_if(tasks.begin(), tasks.end(), [id](const Task& task) { return task.id == id; });
    if (it != tasks.end() && it->status != status) {
        it->status = status;
        return true;
    }
    return false;
}

void showList() {
    std::unordered_map<TaskStatus, std::vector<std::string>> list;

    for (const auto& task : tasks) {
        std::string statusStr;
        switch (task.status) {
        case TaskStatus::Todo: statusStr = "Todo"; break;
        case TaskStatus::InProgress: statusStr = "In Progress"; break;
        case TaskStatus::Done: statusStr = "Done"; break;
        }
        list[task.status].push_back(std::to_string(task.id) + " \"" + task.description + "\"");
    }

    std::cout << "Todo:" << std::endl;
    for (const auto& task : list[TaskStatus::Todo]) {
        std::cout << "  " << task << std::endl;
    }
    std::cout << "In Progress:" << std::endl;
    for (const auto& task : list[TaskStatus::InProgress]) {
        std::cout << "  " << task << std::endl;
    }
    std::cout << "Done:" << std::endl;
    for (const auto& task : list[TaskStatus::Done]) {
        std::cout << "  " << task << std::endl;
    }
}

int main() {
    try {
        addTask("create a task");
        addTask("make a bed");
        addTask("write a post", TaskStatus::InProgress);
        changeStatus(1, TaskStatus::Done);
        deleteTask(2);
        showList();
    }
    catch (const std::invalid_argument& e) {
        std::cerr << e.what() << std::endl;
    }

    return 0;
}