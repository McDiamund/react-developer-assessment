import {
  Alert,
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useEffect, useState } from "react";
import LoadingBar from "../components/LoadingBar";
import { useUserContext } from "../contexts/user-context";


type User = {
    name: string
};

const LandingPage = () => {
  const { fetchUsers } = useUserContext();
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getUsers(isMounted);

    return () => {
      isMounted = false; 
    };
  }, []);

  const getUsers = async (mounted: Boolean) => {
    try {

      setLoading(true);

      const users = await fetchUsers();

      if (mounted) {
        setUsers(users);
        setLoading(false);
      }
    } catch (err) {
      if (mounted) {
        console.log(err);
        setLoading(false);
      }
    }
  }

  return (
    <>
      {isLoading && <LoadingBar />}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            width: "90%",
            marginBottom: "10%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <PeopleAltIcon
              sx={{
                fontSize: { xs: "80px", sm: "100px", md: "100px", lg: "100px" },
                color: "rgb(16, 29, 100)",
              }}
            />
            <Typography
              sx={{
                fontSize: {
                  xs: "3rem", 
                  sm: "5rem", 
                  md: "5rem", 
                },
              }}
            >
              Userbook
            </Typography>
          </Box>
          <Typography
            color="rgb(32, 32, 32)"
            sx={{ marginLeft: "5px", marginBottom: "20px", fontSize: {
                  xs: "1.2rem", 
                  sm: "1.6rem", 
                  md: "1.6rem", 
                }, }}
          >
            Find the right user for you
          </Typography>

          <Autocomplete
            options={users}
            sx={{ width: "100%" }}
            getOptionLabel={(option: User) => option.name}
            renderInput={(params) => <TextField {...params} label={isLoading ? "Loading..." : "Movie"} />}
            renderOption={(props, option: User) => {
              const { key, ...optionProps } = props;
              return (
                <Box key={key}>
                  {option.name}
                </Box>
              )
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default LandingPage;
