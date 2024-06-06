import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../Web/Context/FeatureUser.jsx';
import { BsBicycle, BsCheck } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TablePagination, tablePaginationClasses as classes } from '@mui/base/TablePagination';
import { styled } from '@mui/system';
import '.././Users/Users.css'

export default function Orders() {
  const { userToken } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}order/getAll`, {
        headers: { Authorization: `Rufaidah__${userToken}` }
      });
      setOrders(response.data.orders);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchOrders();
  }, [userToken]);

  const handleChangeStatus = async (orderId, status) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}order/changeStatus/${orderId}`,
        { status },
        {
          headers: { Authorization: `Rufaidah__${userToken}` }
        }
      );
      // Update the order status locally
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <p>جارٍ التحميل...</p>;
  }

  if (error) {
    return <p>خطأ: {error.message}</p>;
  }

  return (
    <Root>
      <h1>الطلبات</h1>
      <table className="table table-bordered users-table">
        <thead>
          <tr>
            <th>الزبون</th>
            <th>العنوان</th>
            <th>رقم الهاتف</th>
            <th>المبلغ</th>
            <th>نوع الدفع</th>
            <th>الحالة</th>
            <th>تغيير الحالة</th>
          </tr>
        </thead>
        <tbody>
          {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
            <tr key={order._id}>
              <td>{order.customer}</td>
              <td>{order.address}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.amount}</td>
              <td>{order.paymentType}</td>
              <td>{order.status}</td>
              <td>
                <div className="btn-group">
                  {order.status !== 'confirmed' && (
                    <button
                      className="btn btn-secondary mx-2 border rounded-2 bg-success"
                      onClick={() => handleChangeStatus(order._id, 'confirmed')}
                    >
                      <BsCheck />
                    </button>
                  )}
                  {order.status !== 'onway' && (
                    <button
                      className="btn btn-secondary mx-2 border rounded-2 bg-info"
                      onClick={() => handleChangeStatus(order._id, 'onway')}
                    >
                      <BsBicycle />
                    </button>
                  )}
                  {order.status !== 'cancelled' && (
                    <button
                      className="btn btn-secondary bg-danger border rounded-2"
                      onClick={() => handleChangeStatus(order._id, 'cancelled')}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'الكل', value: -1 }]}
              colSpan={7}
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
}

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? "#303740" : "#DAE2ED"};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? "1C2025" : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
