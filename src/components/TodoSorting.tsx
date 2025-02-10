import { EnumSortStatus, ITodoInfo } from "../types/todos"

interface TodoSortingProps {
    todosInfo: ITodoInfo
    preload: (status?: EnumSortStatus) => Promise<void>
    filter: EnumSortStatus
    setFilter: React.Dispatch<React.SetStateAction<EnumSortStatus>>
}

export default function TodoSorting({ todosInfo, preload, filter, setFilter }: TodoSortingProps) {
    
    function handleSortClick(sortTo: EnumSortStatus) {
        setFilter(sortTo)
        preload(sortTo)
    }

    return (
        <div className="sorting__list">
            <div
                className={filter === EnumSortStatus.ALL ? 'activ-sort' : ''}
                onClick={() => handleSortClick(EnumSortStatus.ALL)}
            >
                Все ({todosInfo.all})
            </div>
            <div
                className={filter === EnumSortStatus.INWORK ? 'activ-sort' : ''}
                onClick={() => handleSortClick(EnumSortStatus.INWORK)}
            >
                в работе ({todosInfo.inWork})
            </div>
            <div
                className={filter === EnumSortStatus.COMPLITED ? 'activ-sort' : ''}
                onClick={() => handleSortClick(EnumSortStatus.COMPLITED)}
            >
                сделано ({todosInfo.completed})
            </div>
        </div>
    )
}