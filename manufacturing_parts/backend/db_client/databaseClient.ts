export abstract class DatabaseClient<T> {
    abstract getDBClient(): T;
}
