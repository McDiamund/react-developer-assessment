import {
  Autocomplete,
  Box,
  Card,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useEffect, useState } from "react";
import LoadingBar from "../components/LoadingBar";
import { useUserContext } from "../contexts/user-context";


type User = {
    name: string
    address: {
      street?: string
      suite?: string
      zipcode?: string
      city?: string
    }
};

const LandingPage = () => {
  const { fetchUsers, setError } = useUserContext();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
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

      const users: User[] = await fetchUsers();

      users.push({"name": "Dr. José Antonio de la Cruz Martínez Hernández", "address": { "street": "Norberto Crossing", "suite": "Unit 100", "zipcode": "2305-1337"}})

      users.push({"name": "Mx. James Von Doe III", "address": { "street": "Queens Landing", "suite": "Lot 49", "zipcode": "2305-1337"}})

      users.push({"name": "Prof. Don Varun Green V", "address": { "street": "Name Testing", "suite": "Unit 6030", "zipcode": "2305-1337"}})

      const sortedUsers = sortRenameUser(users);

      if (mounted) {
        setUsers(sortedUsers);
        setLoading(false);
      }
    } catch (err: unknown) {
      if (mounted) {
        if (err instanceof Error) {
          console.log(err.message);
          setError({ message: err.message });
        } else {
          console.log(err);
          setError({ message: String(err) });
        }
        setLoading(false);
      }
    }
  }

  const sortRenameUser = (users: User[]) => {

    // get name
    // detect title if present
    // if title is present the next word is the first name and anything after is the middle, last, suffix etc.

    // move the title and first name to the end and add a comma as a prefix.
  
    const renamedUsers = users.map(
      (user) => {
        
        let title = user.name.match(/(Mr\.|Mrs\.|Ms\.|Mx\.|Dr\.|Prof\.?)(?=\s)/i)

        let firstNameRegex = /\p{L}+(?=\s)/u
        let firstName = firstNameRegex.exec(user.name);

        if (title) {
          firstNameRegex = /(?<=\s)\p{L}+(?=\s)/u
          firstName = firstNameRegex.exec(user.name)
        }

        if (firstName) {
          user.name = `${user.name.substring(firstName.index + firstName[0].length + 1)}, ${firstName[0]} ${title ? `(${title[0]})` : ''}`
        }
        
        return user
      }
    )

    const sortedUsers = renamedUsers.sort((a , b) => a.name.localeCompare(b.name));

    return sortedUsers
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
            height: "420px",
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
            sx={{ width: "100%", marginBottom: "20px" }}
            getOptionLabel={(option: User) => option.name}
            renderInput={(params) => <TextField {...params} sx={{ backgroundColor: "white" }} label={isLoading ? "Loading..." : "User"} />}
            onChange={(event, value) => {
              setSelectedUser(value);
            }}
            slotProps={{
              listbox: {
                sx: {
                  '& .MuiAutocomplete-option': {
                    borderBottom: '1px solid #ddd',
                    py: 1,
                    px: 2,
                    '&:last-of-type': {
                      borderBottom: 'none',
                    },
                  },
                },
              },
            }}
            renderOption={(props, option: User) => {
              const { key } = props;
              return (
                <li {...props} key={key}>
                  <Box sx={{ paddingY: "5px", paddingX: "5px" }}>
                    <Typography sx={{ fontWeight: "bold"}}>{option.name}</Typography>
                  </Box>
                </li>
              )
            }}
          />
          {selectedUser && (
            <Card sx={{ width: "100%", paddingX: "10px", boxSizing: "border-box" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", marginY: "10px"}}>{selectedUser.name}</Typography>
              <Divider />
              <Box sx={{ paddingY: "5px" }}>
                <Typography>{selectedUser.address.street}</Typography>
                <Typography>{selectedUser.address.suite}</Typography>
                <Typography>{selectedUser.address.city}</Typography>
                <Typography>{selectedUser.address.zipcode}</Typography>
              </Box>
            </Card>
          )}

        </Box>
      </Container>
    </>
  );
};

export default LandingPage;
