import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { get, debounce } from "lodash";
import { getNews } from "../../api/RestApi";
import { setNews } from "../../redux/reducers/news";
import NewsTable from "../../Components/NewsTable";
import { Input, Container, Button, CircularProgress } from "@material-ui/core";

interface Props {
  articles: [
    {
      author: string;
      content: string;
      description: string;
      publishedAt: string;
      title: string;
      url: string;
      urlToImage: string;
      source: {
        id: string;
        name: string;
      };
    }
  ];
}

const useStyles = makeStyles({
  root: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
  },
  loader: {
    display: "flex",
    alignSelf: "center",
  },
  input: {
    marginTop: 20,
    width: "100%",
    border: "1px solid black",
    height: 50,
  },
});

const News: React.FC<Props> = ({ articles }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("bitcoin");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [showNews, setShowNews] = useState<boolean>(false);

  useEffect(() => {
    if (showNews) {
      setIsLoading(true);
      getNews(page, rowsPerPage, searchText)
        .then((res) => {
          dispatch(setNews(get(res, "data.articles", [])));
        })
        .catch((e) => {
          console.log("Error: ", e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [page, rowsPerPage, searchText, showNews, dispatch]);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSave(event.target.value);
  };

  const debouncedSave = useCallback(
    debounce((value) => changeSearchText(value), 500),
    []
  );

  const changeSearchText = (text: string) => {
    if (text) {
      setSearchText(text);
    } else {
      setSearchText("bitcoin");
    }

    setPage(1);
  };

  const handleSort = () => {
    setSortOrder(+!sortOrder);
  };
  return (
    <Container className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowNews(!showNews)}
      >
        {showNews ? "Hide News" : "Show News"}
      </Button>
      {isLoading && <CircularProgress className={classes.loader} />}
      {showNews && (
        <>
          <Input
            onChange={onChange}
            placeholder="Search..."
            className={classes.input}
          />
          <NewsTable
            data={articles}
            setPage={setPage}
            page={page}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
            handleSort={handleSort}
          />
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state: {}) => ({
  articles: get(state, "news.data", []),
});
export default connect(mapStateToProps)(News);
