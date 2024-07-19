import React, { useState } from 'react';
import { Grant, GrantStatus } from '../types';
import classnames from 'classnames';
import dayjs from 'dayjs';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface GrantTableProps {
  grants: Grant[];
  perPage?: number;
}

const statusesMapper: Record<GrantStatus, string> = {
  [GrantStatus.APPLIED]: "Applied",
  [GrantStatus.REJECTED]: "Rejected",
  [GrantStatus.ACCEPTED]: "Accepted",
};

const GrantTable: React.FC<GrantTableProps> = ({ grants, perPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const offset = currentPage * perPage;
  const currentGrants = grants.slice(offset, offset + perPage);
  const pageCount = Math.ceil(grants.length / perPage);

  return (
    <>
      <table className="min-w-full bg-white rounded-xl border border-gray-200">
        <thead>
        <tr>
          {['Foundation name', 'Grant name', 'Average Amount', 'Status', 'Deadline', 'Match Date'].map((header) => (
            <th key={header} className="py-2 px-4 border border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {currentGrants.map((grant) => (
          <tr key={grant.id} className="bg-white">
            <td className="py-2 px-4 border border-gray-200">{grant.companyName}</td>
            <td className="py-2 px-4 border border-gray-200">{grant.title}</td>
            <td className="py-2 px-4 border border-gray-200">${grant.avgAmount}</td>
            <td className="py-2 px-4 border border-gray-200">
              <div className={classnames("px-2 py-1 rounded-2xl text-center", {
                "bg-lime-200 text-lime-600": grant.status === GrantStatus.ACCEPTED,
                "bg-indigo-200 text-indigo-600": grant.status === GrantStatus.APPLIED,
                "bg-rose-200 text-rose-600": grant.status === GrantStatus.REJECTED,
              })}>
                {statusesMapper[grant.status]}
              </div>
            </td>
            <td className="py-2 px-4 border border-gray-200">{dayjs(grant.deadlineDate).format("MMMM DD")}</td>
            <td className="py-2 px-4 border border-gray-200">{dayjs(grant.matchDate).format("DD MMMM YYYY")}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className="py-4 flex justify-center">
        <ReactPaginate
          previousLabel={<button className="flex items-center justify-center p-2 rounded-md bg-blue-500 text-white"><FontAwesomeIcon icon={faChevronLeft} /></button>}
          nextLabel={<button className="flex items-center justify-center p-2 rounded-md bg-blue-500 text-white"><FontAwesomeIcon icon={faChevronRight} /></button>}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'text-white pagination flex items-center space-x-2'}
          activeClassName={'text-white'}
          activeLinkClassName={'p-2 bg-blue-500 rounded-md text-white focus:text-white'}
        />
      </div>
    </>
  );
};

export default GrantTable;
