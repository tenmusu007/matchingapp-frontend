import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#273885",
		color: "#273885",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1,
		},
		"100%": {
			transform: "scale(2.4)",
			opacity: 0,
		},
	},
}));

const ChatList = () => {
	const { user } = useContext(AuthContext);
	const [chat, setChat] = useState([]);
	// console.log("chaat",chat);
	const [image, setImage] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get(`${process.env.REACT_APP_SERVER_URL}/chat/getchatlist`, {
					withCredentials: true,
				})
				.then((res) => {
					console.log("user like", res.data);
					setChat(res.data);
				});
		};
		fetchData().catch(console.error);
	}, [user]);
	const deleteChat = (e) => {
		console.log("hey", e);
		const chatInfo = {
      chatId: chat[e].createdChat._id,
		};
    console.log("hey", chatInfo);
		axios.post(
			`${process.env.REACT_APP_SERVER_URL}/chat/deletechat`,
			chatInfo,
			{withCredentials: true}
		).then(res=>{console.log(res);})
	};
	return (
		<MainLayout>
			<List
				dense
				sx={{
					width: "100%",
					marginX: "auto",
					maxWidth: 360,
					bgcolor: "background.paper",
				}}
			>
				{chat.map((value, index) => {
					return (
						<div key={value.createdChat._id}>
							<Divider variant='inset' component='li' />
							<ListItem disablePadding>
								<ListItemButton
									component={Link}
									to={`/chat/room=${value.createdChat._id}`}
									state={{ matchedUserName: value.userInfo.username }}
								>
									<ListItemAvatar>
										<StyledBadge
											overlap='circular'
											anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
											variant={`${!value.createdChat.text.length ? "dot" : ""}`}
										>
											<Avatar
												alt={`Avatar n°${1}`}
												src={value.userInfo.image}
											/>
										</StyledBadge>
									</ListItemAvatar>
									<ListItemText
										primary={value.userInfo.username}
										secondary={
											value.createdChat.text.length > 0
												? value.createdChat.text[
														value.createdChat.text.length - 1
												  ].msg
												: "Make a first move!"
										}
									/>
								</ListItemButton>
								<button onClick={() => deleteChat(index)}>unmatch</button>
							</ListItem>
						</div>
					);
				})}
			</List>
		</MainLayout>
	);
};

export default ChatList;
