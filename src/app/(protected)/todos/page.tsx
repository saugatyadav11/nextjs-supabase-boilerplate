'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { fetchTodos, createTodo, updateTodo, deleteTodo, toggleTodoCompletion, subscribeTodoChanges, Todo } from '@/lib/db';

export default function TodosPage() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const loadTodos = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      const data = await fetchTodos(user.id);
      setTodos(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadTodos();
      
      // Subscribe to realtime changes
      const subscription = subscribeTodoChanges(user.id, (payload) => {
        console.log('Realtime update:', payload);
        loadTodos(); // Reload todos when changes occur
      });
      
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user?.id]);

  const onSubmit = async (data: { title: string; description: string }) => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      await createTodo({
        title: data.title,
        description: data.description || undefined,
        user_id: user.id,
      });
      form.reset();
      await loadTodos();
    } catch (err: any) {
      setError(err.message || 'Failed to create todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTodo = async (todoId: string) => {
    if (!user?.id) return;
    
    try {
      await toggleTodoCompletion(todoId, user.id);
      // The realtime subscription will update the UI
    } catch (err: any) {
      setError(err.message || 'Failed to update todo');
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    if (!user?.id) return;
    
    try {
      await deleteTodo(todoId, user.id);
      // The realtime subscription will update the UI
    } catch (err: any) {
      setError(err.message || 'Failed to delete todo');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Todos</CardTitle>
            <CardDescription>Manage your tasks and stay organized</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a task..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Add details..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Todo'}
                </Button>
              </form>
            </Form>

            {error && (
              <div className="mt-4 rounded bg-red-50 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <div className="mt-6">
              <h3 className="mb-4 text-lg font-medium">Your Tasks</h3>
              {isLoading ? (
                <p>Loading tasks...</p>
              ) : todos.length === 0 ? (
                <p className="text-muted-foreground">No tasks yet. Add one above!</p>
              ) : (
                <ul className="space-y-3">
                  {todos.map((todo) => (
                    <li key={todo.id} className="flex items-start justify-between rounded border p-3">
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id={`todo-${todo.id}`}
                          checked={todo.is_complete}
                          onCheckedChange={() => handleToggleTodo(todo.id)}
                          className="mt-1"
                        />
                        <div className="space-y-1">
                          <label
                            htmlFor={`todo-${todo.id}`}
                            className={`font-medium ${todo.is_complete ? 'line-through text-muted-foreground' : ''}`}
                          >
                            {todo.title}
                          </label>
                          {todo.description && (
                            <p className={`text-sm ${todo.is_complete ? 'text-muted-foreground' : 'text-gray-500'}`}>
                              {todo.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="h-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
