import { supabase } from './supabase';

export type Todo = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
};

export type NewTodo = {
  title: string;
  description?: string;
  user_id: string;
};

/**
 * Fetch all todos for a specific user
 */
export async function fetchTodos(userId: string) {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }

  return data as Todo[];
}

/**
 * Fetch a single todo by ID
 */
export async function fetchTodoById(todoId: string, userId: string) {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', todoId)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching todo:', error);
    throw error;
  }

  return data as Todo;
}

/**
 * Create a new todo
 */
export async function createTodo(todo: NewTodo) {
  const { data, error } = await supabase
    .from('todos')
    .insert(todo)
    .select()
    .single();

  if (error) {
    console.error('Error creating todo:', error);
    throw error;
  }

  return data as Todo;
}

/**
 * Update a todo
 */
export async function updateTodo(todoId: string, updates: Partial<Todo>, userId: string) {
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', todoId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating todo:', error);
    throw error;
  }

  return data as Todo;
}

/**
 * Toggle a todo's completion status
 */
export async function toggleTodoCompletion(todoId: string, userId: string) {
  // First, get the current state
  const todo = await fetchTodoById(todoId, userId);
  
  // Then toggle it
  return updateTodo(todoId, { is_complete: !todo.is_complete }, userId);
}

/**
 * Delete a todo
 */
export async function deleteTodo(todoId: string, userId: string) {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', todoId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }

  return true;
}

/**
 * Subscribe to changes in todos for a specific user
 */
export function subscribeTodoChanges(userId: string, callback: (payload: any) => void) {
  return supabase
    .channel('todos_changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'todos', filter: `user_id=eq.${userId}` },
      callback
    )
    .subscribe();
}

/**
 * Initialize user profile after registration
 */
export async function initializeProfile(userId: string, username?: string) {
  const { error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      username: username || userId.substring(0, 8),
    });

  if (error && error.code !== '23505') { // Ignore duplicate key errors
    console.error('Error creating profile:', error);
    throw error;
  }

  return true;
}

/**
 * Fetch user profile
 */
export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // Not found
    console.error('Error fetching profile:', error);
    throw error;
  }

  return data;
}

/**
 * Update user profile
 */
export async function updateProfile(userId: string, updates: { username?: string; full_name?: string; avatar_url?: string }) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }

  return data;
}
