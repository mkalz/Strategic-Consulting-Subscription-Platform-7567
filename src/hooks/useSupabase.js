import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useSupabaseQuery = (table, query = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [table, JSON.stringify(query)]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let queryBuilder = supabase.from(table).select(query.select || '*');

      // Apply filters
      if (query.filters) {
        query.filters.forEach(filter => {
          queryBuilder = queryBuilder[filter.method](filter.column, filter.value);
        });
      }

      // Apply ordering
      if (query.order) {
        queryBuilder = queryBuilder.order(query.order.column, { 
          ascending: query.order.ascending !== false 
        });
      }

      // Apply limit
      if (query.limit) {
        queryBuilder = queryBuilder.limit(query.limit);
      }

      const { data, error } = await queryBuilder;

      if (error) throw error;

      setData(data);
    } catch (err) {
      setError(err.message);
      console.error('Supabase query error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export const useSupabaseRealtime = (table, callback, filters = {}) => {
  useEffect(() => {
    const channel = supabase
      .channel(`realtime-${table}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: table,
        ...filters
      }, callback)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, callback]);
};

export const useSupabaseMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (operation) => {
    try {
      setLoading(true);
      setError(null);

      const result = await operation();
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Supabase mutation error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};