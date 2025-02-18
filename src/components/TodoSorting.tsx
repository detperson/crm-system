import { Button } from "antd"
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
            <Button 
                size="large"
                variant="link"
                color={filter === EnumSortStatus.ALL ? "primary" : "default"}
                onClick={() => handleSortClick(EnumSortStatus.ALL)}
            >
                Все ({todosInfo.all})
            </Button>
            <Button 
                size="large"
                variant="link"
                color={filter === EnumSortStatus.INWORK ? "primary" : "default"}
                onClick={() => handleSortClick(EnumSortStatus.INWORK)}
            >
                в работе ({todosInfo.inWork})
            </Button>
            <Button 
                size="large"
                variant="link"
                color={filter === EnumSortStatus.COMPLITED ? "primary" : "default"}
                onClick={() => handleSortClick(EnumSortStatus.COMPLITED)}
            >
                сделано ({todosInfo.completed})
            </Button>
        </div>
    )
}