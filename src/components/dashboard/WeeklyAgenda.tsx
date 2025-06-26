
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { WeeklySchedule } from '@/types/dashboard';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface WeeklyAgendaProps {
  weeklySchedule: WeeklySchedule[];
  totalConflicts: number;
}

const WeeklyAgenda: React.FC<WeeklyAgendaProps> = ({ weeklySchedule, totalConflicts }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Agenda Semanal
          </CardTitle>
          {totalConflicts > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {totalConflicts} conflito{totalConflicts > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-40 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklySchedule}>
              <XAxis dataKey="day" />
              <YAxis />
              <Bar dataKey="appointments" radius={4}>
                {weeklySchedule.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.conflicts > 0 ? "#ef4444" : "#3b82f6"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Rota Otimizada
          </Button>
          <Button size="sm" variant="outline">
            Ver Agenda Completa
          </Button>
        </div>
        
        {totalConflicts > 0 && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            Atenção: Verifique os conflitos de horário na sua agenda
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyAgenda;
