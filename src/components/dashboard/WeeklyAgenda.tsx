
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
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
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
      <CardContent className="pt-0 flex flex-col h-full">
        <div className="h-40 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklySchedule}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                fontSize={12}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                fontSize={12}
              />
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
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button size="sm" variant="outline" className="flex items-center gap-2 h-10">
            <MapPin className="h-4 w-4" />
            <span className="text-xs">Rota Otimizada</span>
          </Button>
          <Button size="sm" variant="outline" className="h-10">
            <span className="text-xs">Ver Agenda Completa</span>
          </Button>
        </div>
        
        {totalConflicts > 0 && (
          <div className="mt-auto p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <AlertTriangle className="h-4 w-4 inline mr-2" />
            Atenção: Verifique os conflitos de horário na sua agenda
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyAgenda;
