import { Injectable } from '@angular/core';

function getWindow (): any {
    return window;
}

@Injectable()
export class WindowService {
    get nativeWindow(): any {
        return getWindow();
    }

    responsiveWidth(): string {
       return (getWindow().innerWidth > 800) ? '40%' : '80%';
    }

    reloadWindow(): void {
       getWindow().location.reload();
    }
}
