import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/auth-context";
import { addMyPlayListIntoUserLibrary } from "../utils/addMyPlayListIntoUserlibrary";
import { addSongsToMyPlaylist } from "../utils/addSongToMyPlaylist.js";
