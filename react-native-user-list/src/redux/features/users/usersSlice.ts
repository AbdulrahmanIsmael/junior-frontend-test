import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { T_user } from "@/types/users-types";

const CACHE_KEY = "users_cache";
// cache time to update the users every 10 minutes
const CACHE_TIME = 10 * 60 * 1000;

function calcPageSize(total: number): number {
  if (total <= 0) return 4;
  return Math.min(10, Math.max(3, Math.round(total * 0.4)));
}

interface CacheEntry {
  data: T_user[];
  savedAt: number;
}

// get cached users
async function readCache(): Promise<T_user[] | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    const age = Date.now() - entry.savedAt;
    if (age > CACHE_TIME) return null;
    return entry.data;
  } catch {
    return null;
  }
}

// write users to the storage
async function writeCache(data: T_user[]): Promise<void> {
  try {
    const entry: CacheEntry = { data, savedAt: Date.now() };
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch (error) {
    console.log(error);
  }
}

export interface I_userState {
  allUsers: T_user[];
  filteredUsers: T_user[];
  query: string;
  currentPage: number;
  pageSize: number;
  hasMore: boolean;
  loading: boolean;
  loadingMore: boolean;
  error: boolean;
  fromCache: boolean;
}

const initialState: I_userState = {
  allUsers: [],
  filteredUsers: [],
  query: "",
  currentPage: 1,
  pageSize: 4,
  hasMore: false,
  loading: false,
  loadingMore: false,
  error: false,
  fromCache: false,
};

// filter users by query name
function filterUsers(users: T_user[], query: string): T_user[] {
  if (!query.trim()) return users;
  const q = query.toLowerCase();
  return users.filter(
    (u) =>
      u.name?.toLowerCase().includes(q) ||
      u.username?.toLowerCase().includes(q),
  );
}

// create pages for fetched users
function paginate(filtered: T_user[], page: number, size: number): T_user[] {
  return filtered.slice(0, page * size);
}

// Async thunk to fetch users + cache the results
export const getUsers = createAsyncThunk<
  { data: T_user[]; fromCache: boolean },
  void
>("users/getUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: T_user[] = await response.json();
    await writeCache(data);
    return { data, fromCache: false };
  } catch {
    const cached = await readCache();
    if (cached && cached.length > 0) {
      return { data: cached, fromCache: true };
    }
    return rejectWithValue("no_data");
  }
});

// Async thunk to handle load more users
export const loadMoreUsers = createAsyncThunk(
  "users/loadMore",
  async (_, { getState }) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 600));
    const { currentPage } = (getState() as { users: I_userState }).users;
    return currentPage + 1;
  },
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.currentPage = 1;
      const filtered = filterUsers(state.allUsers, action.payload);
      state.filteredUsers = paginate(filtered, 1, state.pageSize);
      state.hasMore = filtered.length > state.pageSize;
    },
  },
  extraReducers: (builder) => {
    // get users cases
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        const { data, fromCache } = action.payload;
        const size = calcPageSize(data.length);

        state.loading = false;
        state.error = false;
        state.fromCache = fromCache;
        state.allUsers = data;
        state.pageSize = size;
        state.currentPage = 1;

        const filtered = filterUsers(data, state.query);
        state.filteredUsers = paginate(filtered, 1, size);
        state.hasMore = filtered.length > size;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
    // loading more cases
    builder
      .addCase(loadMoreUsers.pending, (state) => {
        state.loadingMore = true;
      })
      .addCase(loadMoreUsers.fulfilled, (state, action) => {
        const nextPage = action.payload;
        state.loadingMore = false;
        state.currentPage = nextPage;

        const filtered = filterUsers(state.allUsers, state.query);
        state.filteredUsers = paginate(filtered, nextPage, state.pageSize);
        state.hasMore = filtered.length > nextPage * state.pageSize;
      })
      .addCase(loadMoreUsers.rejected, (state) => {
        state.loadingMore = false;
      });
  },
});

export const { setQuery } = usersSlice.actions;

export default usersSlice.reducer;
