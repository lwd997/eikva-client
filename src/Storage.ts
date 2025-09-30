type Sub = () => void;

export interface ApplicationStorage {
    isAuthorized: boolean;
    userLogin: string | null;
    userUUID: string | null;
}

class Store {
    private state: ApplicationStorage;
    private subscribers: Set<Sub> = new Set();

    constructor(initialState: ApplicationStorage) {
        this.state = initialState;

        this.getSnapshot = this.getSnapshot.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }

    updateField<T extends keyof ApplicationStorage>(key: T, value: ApplicationStorage[T]) {
        this.state[key] = value;
        this.update();
    }

    updatePart(s: Partial<ApplicationStorage>) {
        this.state = { ...this.state, ...s };
        this.emit();
    }

    getSnapshot() {
        return this.state;
    }

    update() {
        this.state = { ...this.state };
        this.emit();
    }

    emit() {
        this.subscribers.forEach((callback) => callback());
    }

    subscribe(callback: Sub) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }
}

export const appStore = new Store({
    isAuthorized: !!localStorage.getItem("access_token"),
    userUUID: null,
    userLogin: null
});

