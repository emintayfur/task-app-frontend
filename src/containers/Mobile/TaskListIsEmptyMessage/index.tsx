import React from 'react';
import NotFoundPattern from '../../../assets/svg/notFoundPattern.svg';

const TaskListIsEmptyMessage = () => {
    return (
        <div className="flex flex-col relative w-full -mt-4 lg:mt-0 items-end min-h-[300px] justify-center items-center">
            <NotFoundPattern className="visible lg:hidden" />
            <div className="flex flex-col gap-3 justify-center items-center w-11/12 md:w-9/12 lg:w-7/12 font-inter text-grey-500 mx-auto -mt-20 lg:mt-0">
                <h1 className="font-semibold text-4xl">
                    Liste Boş{' '}
                    <span role="img" aria-hidden="false">
                        😎
                    </span>
                </h1>
                <p className="font-medium w-10/12 text-center">
                    Sanırım tüm işlerini tamamladın veya hiç eklemedin. Eğer hiç
                    eklemediysen{' '}
                    <strong className="font-black font-sans text-green-500">
                        “Görev Oluştur”
                    </strong>{' '}
                    diyerek kendine bir iş yaratabilirsin :)
                </p>
            </div>
        </div>
    );
};

export default TaskListIsEmptyMessage;
