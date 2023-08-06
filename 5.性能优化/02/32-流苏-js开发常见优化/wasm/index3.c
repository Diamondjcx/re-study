#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <emscripten/emscripten.h>
// 一旦WASM模块被加载，main()中的代码就会执行
int main(int argc, char ** argv) {
    printf("hello  wasm\n");
}

