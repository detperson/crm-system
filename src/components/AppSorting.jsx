export default function AppSorting({ todos, setFilter }) {
    return (
        <div className="sorting__list">
            <div
                onClick={() => setFilter('all')}
            >
                Все({todos.info ? todos.info.all : 0})
            </div>
            <div
                onClick={() => setFilter('in-work')}
            >
                в работе({todos.info ? todos.info.inWork : 0})
            </div>
            <div
                onClick={() => setFilter('completed')}
            >
                сделано({todos.info ? todos.info.completed : 0})
            </div>
        </div>
    )
}